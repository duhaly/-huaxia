import { Context, Next } from '@nocobase/actions';
import { Console } from 'console';
import crypto from 'crypto';

export async function generate(ctx: Context, next: Next) {

    // 从query参数获取appSecret
    const account = ctx.request?.query?.account;
    // 建议添加参数校验
    if (!account || typeof account !== 'string') {
        ctx.throw(400, 'Invalid account');
    }

    const repository = ctx.db.getRepository('dataeaseEmbeding');
    const record = await repository.findOne({
        where: { account },
        // 建议明确指定需要的字段
        attributes: ['appId', 'appSecret']
    });

    if (!record) {
        ctx.throw(404, 'App not found');
    }

    const token = generateToken(account, record.appId, record.appSecret);
    ctx.body = { token };
    return next();
}

function generateToken(account: string, appId: string, appSecret: string) {
    // 1. 创建 Header (头部)
    const header = {
        alg: 'HS256', // HMAC SHA256 算法
        typ: 'JWT'    // 类型为 JWT
    };
    const encodedHeader = toBase64Url(Buffer.from(JSON.stringify(header)));

    // 2. 创建 Payload (载荷)
    const nowInSeconds = Math.floor(Date.now() / 1000); // JWT 'iat' 通常是秒级时间戳
    const payload = {
        account: account,
        appId: appId,
        iat: nowInSeconds,
    };
    const encodedPayload = toBase64Url(Buffer.from(JSON.stringify(payload)));

    // 3. 创建签名
    // 签名数据是编码后的 header 和 payload，用点连接
    const signatureData = `${encodedHeader}.${encodedPayload}`;

    const hmac = crypto.createHmac('sha256', appSecret);
    hmac.update(signatureData);
    const signature = hmac.digest(); // 得到 Buffer
    const encodedSignature = toBase64Url(signature);

    // 4. 拼接成 JWT
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

}
function toBase64Url(input: Buffer): string {
    return input.toString('base64url');
}