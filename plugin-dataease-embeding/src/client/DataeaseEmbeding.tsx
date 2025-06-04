/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer, useField } from '@formily/react';
import {
  useBlockHeight,
  useCompile,
  useLocalVariables,
  useParseURLAndParams,
  useVariables,
  useAPIClient,
} from '@nocobase/client';
import { Card, Spin, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { IIframe } from 'react-iframe/types';


function isNumeric(str: string | undefined) {
  if (typeof str !== 'string') return false; // we only process strings!
  return (
    !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  );
}

export const DataeaseEmbeding: any = observer(
  (props: IIframe & { params?: any; account: string; templateId: string | number; ref?: React.Ref<HTMLIFrameElement> }) => {
    const { url, height, params, account, sandbox: sandboxProp, templateId, loading: loadingProp, ...others } = props;
    const field = useField();
    const { t } = useTranslation();
    const { token } = theme.useToken();
    const targetHeight = useBlockHeight() || height;
    const variables = useVariables();
    const localVariables = useLocalVariables();
    const compile = useCompile();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { parseURLAndParams } = useParseURLAndParams();
    const [src, setSrc] = useState<string | undefined>(undefined);
    const [embeddedTokenState, setEmbeddedTokenState] = useState<string | undefined>(undefined);
    const [sendMessageSignalReceived, setSendMessageSignalReceived] = useState(false);
    const apiClient = useAPIClient();

    useEffect(() => {
      const generateSrcAndFetchToken = async () => {
        try {
          const response = await apiClient.resource('dataeaseEmbeding').generate({
            account: account,
          });
          const fetchedToken = response.data?.token || response.data?.data?.token;

          setEmbeddedTokenState(fetchedToken);

          if (!fetchedToken) {
             console.error('Failed to get embeddedToken.');
             return;
          }

          let targetSrc: string;
          targetSrc = await parseURLAndParams(url, params || []);
          if (!targetSrc) {
              console.warn('URL mode requires a valid URL.');
              return;
          }

          setSrc(targetSrc);

        } catch (error) {
          console.error('Error generating iframe source or fetching token:', error);
           setEmbeddedTokenState(undefined);
        }
      };

      const requiredDepsReady = !!url;

      if (requiredDepsReady) {
           if (src === undefined) {
               generateSrcAndFetchToken();
           }
      } else if (!url) {
          console.warn('URL mode requires a URL.');
      }

    }, [url, variables, localVariables, params, account, apiClient, compile, parseURLAndParams]);

    const dataeaseCallBack = (args: any) => {
      console.log('DataEase callback:', args);
      alert('call back from dataease!');
    };

    useEffect(() => {
        const _message_ = (event: MessageEvent) => {
          if (event.data?.msgOrigin !== 'de-fit2cloud') {
            return;
          }

          console.log('Received message from iframe (de-fit2cloud): ', event.data);

          setSendMessageSignalReceived(true);
        };

        window.addEventListener('message', _message_);

        return () => {
          window.removeEventListener('message', _message_);
        };

    }, [setSendMessageSignalReceived]);

    useEffect(() => {
        const iframe = iframeRef.current;

        // Check conditions directly, without polling
        if (sendMessageSignalReceived && embeddedTokenState && iframe && iframe.contentWindow && typeof iframe.src === 'string' && iframe.src !== '') {
             const paramsToSend = {
                  busiFlag: 'dashboard',
                  dvId: templateId,
                  type: 'Dashboard',
                  embeddedToken: embeddedTokenState,
                  'de-embedded': true,
                };

                let targetOrigin: string;
                if (iframe.src.startsWith('data:')) {
                    targetOrigin = '*';
                } else {
                     try {
                        const urlObj = new URL(iframe.src);
                        targetOrigin = urlObj.origin;
                     } catch (e) {
                         console.error('Error determining origin from iframe.src:', e);
                         targetOrigin = '*';
                         console.warn('Failed to determine specific origin, falling back to *: ', targetOrigin);
                     }
                }

                try {
                     iframe.contentWindow.postMessage(paramsToSend, targetOrigin);
                     // Reset signal after sending message
                     setSendMessageSignalReceived(false);

                 } catch (e) {
                      console.error('Error sending postMessage:', e);
                 }

        }

    }, [sendMessageSignalReceived, embeddedTokenState, templateId]); // Keep relevant dependencies

    if (!url) {
      return (
        <Card
          style={{ marginBottom: token.padding, height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight }}
        >
          {t('Please fill in the iframe URL')}
        </Card>
      );
    }

    if (src === undefined || !embeddedTokenState) {
       return (
        <div
          style={{
            height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight || '60vh',
            marginBottom: token.padding,
            border: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      );
    }

    if (src) {
        const sandboxValue = Array.isArray(sandboxProp)
            ? sandboxProp.join(' ')
            : typeof sandboxProp === 'string' ? sandboxProp : undefined;

        return (
          <iframe
            src={src}
            ref={iframeRef}
            width="100%"
            style={{
              height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight || '60vh',
              marginBottom: '24px',
              border: 0,
              display: 'block',
              position: 'relative',
            }}
            {...(sandboxValue !== undefined && { sandbox: sandboxValue })}
            {...(loadingProp && loadingProp !== 'auto' && { loading: loadingProp })}
            {...others}
          />
        );
    } else {
        return (
             <Card style={{ marginBottom: token.padding, height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight }}>
                 {t('Failed to load iframe.')}
             </Card>
        );
    }
  },
  { displayName: 'DataeaseEmbeding' },
);
