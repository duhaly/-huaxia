/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var generate_exports = {};
__export(generate_exports, {
  generate: () => generate
});
module.exports = __toCommonJS(generate_exports);
var import_crypto = __toESM(require("crypto"));
async function generate(ctx, next) {
  var _a, _b;
  const account = (_b = (_a = ctx.request) == null ? void 0 : _a.query) == null ? void 0 : _b.account;
  if (!account || typeof account !== "string") {
    ctx.throw(400, "Invalid account");
  }
  const repository = ctx.db.getRepository("dataeaseEmbeding");
  const record = await repository.findOne({
    where: { account },
    // 建议明确指定需要的字段
    attributes: ["appId", "appSecret"]
  });
  if (!record) {
    ctx.throw(404, "App not found");
  }
  const token = generateToken(account, record.appId, record.appSecret);
  ctx.body = { token };
  return next();
}
function generateToken(account, appId, appSecret) {
  const header = {
    alg: "HS256",
    // HMAC SHA256 算法
    typ: "JWT"
    // 类型为 JWT
  };
  const encodedHeader = toBase64Url(Buffer.from(JSON.stringify(header)));
  const nowInSeconds = Math.floor(Date.now() / 1e3);
  const payload = {
    account,
    appId,
    iat: nowInSeconds
  };
  const encodedPayload = toBase64Url(Buffer.from(JSON.stringify(payload)));
  const signatureData = `${encodedHeader}.${encodedPayload}`;
  const hmac = import_crypto.default.createHmac("sha256", appSecret);
  hmac.update(signatureData);
  const signature = hmac.digest();
  const encodedSignature = toBase64Url(signature);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}
function toBase64Url(input) {
  return input.toString("base64url");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generate
});
