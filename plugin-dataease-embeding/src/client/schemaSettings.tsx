/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ISchema, useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import {
  SchemaSettings,
  SchemaSettingsBlockHeightItem,
  useAPIClient,
  useDesignable,
  useURLAndHTMLSchema,
} from '@nocobase/client';
import { Select, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AllowOptionsHelp = ({ type }) => {
  const { t, i18n } = useTranslation();
  const typeToDescription = {
    autoplay: t(
      'Controls whether the current document is allowed to autoplay media requested through the HTMLMediaElement interface. When this policy is disabled and there were no user gestures, the Promise returned by HTMLMediaElement.play() will reject with a NotAllowedError DOMException. The autoplay attribute on <audio> and <video> elements will be ignored.',
    ),
    camera: t(
      'Controls whether the current document is allowed to use video input devices. When this policy is disabled, the Promise returned by getUserMedia() will reject with a NotAllowedError DOMException.',
    ),
    'document-domain': t(
      'Controls whether the current document is allowed to set document.domain. When this policy is disabled, attempting to set document.domain will fail and cause a SecurityError DOMException to be thrown.',
    ),
    'encrypted-media': t(
      'Controls whether the current document is allowed to use the Encrypted Media Extensions API (EME). When this policy is disabled, the Promise returned by Navigator.requestMediaKeySystemAccess() will reject with a SecurityError DOMException.',
    ),
    fullscreen: t(
      'Controls whether the current document is allowed to use Element.requestFullscreen(). When this policy is disabled, the returned Promise rejects with a TypeError.',
    ),
    geolocation: t(
      'Controls whether the current document is allowed to use the Geolocation Interface. When this policy is disabled, calls to getCurrentPosition() and watchPosition() will cause those functions callbacks to be invoked with a GeolocationPositionError code of PERMISSION_DENIED.',
    ),
    microphone: t(
      'Controls whether the current document is allowed to use audio input devices. When this policy is disabled, the Promise returned by MediaDevices.getUserMedia() will reject with a NotAllowedError DOMException.',
    ),
    midi: t(
      'Controls whether the current document is allowed to use the Web MIDI API. When this policy is disabled, the Promise returned by Navigator.requestMIDIAccess() will reject with a SecurityError DOMException.',
    ),
    payment: t(
      'Controls whether the current document is allowed to use the Payment Request API. When this policy is enabled, the PaymentRequest() constructor will throw a SecurityError DOMException.',
    ),
  };

  const description = typeToDescription[type];

  return (
    <span>
      {type}{' '}
      <Tooltip
        zIndex={9999}
        title={
          <span>
            {description}{' '}
            <a
              href={`https://developer.mozilla.org/${i18n.language === 'zh-CN' ? 'zh-CN' : 'en-US'
                }/docs/Web/HTTP/Reference/Headers/Permissions-Policy/${type}`}
              target="_blank"
              rel="noreferrer"
            >
              <LinkOutlined />
            </a>
          </span>
        }
      >
        <QuestionCircleOutlined />
      </Tooltip>
    </span>
  );
};

const AllowDescription = () => {
  const { t, i18n } = useTranslation();
  const helpURL =
    i18n.language === 'zh-CN'
      ? 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe#allow'
      : 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow';
  return (
    <span>
      {t(
        'Specifies a Permissions Policy for the <iframe>. The policy defines what features are available to the <iframe> (for example, access to the microphone, camera, battery, web-share, etc.) based on the origin of the request.',
      )}{' '}
      <a href={helpURL} target="_blank" rel="noreferrer">
        <LinkOutlined />
      </a>
    </span>
  );
};

const commonOptions: any = {
  items: [
    {
      name: 'EditDataeaseEmbeding',
      type: 'modal',
      useComponentProps() {
        const field = useField();
        const fieldSchema = useFieldSchema();
        const { t, i18n } = useTranslation();
        const { dn } = useDesignable();
        const api = useAPIClient();
        const { url, chartType, templateId, businessFlag, account, params, height = '60vh', allow } = fieldSchema['x-component-props'] || {};
        const { urlSchema, paramsSchema } = useURLAndHTMLSchema();
        const submitHandler = async ({ url, chartType, templateId, businessFlag, account, height, params, allow }) => {
          const componentProps = fieldSchema['x-component-props'] || {};
          componentProps['height'] = height;
          componentProps['params'] = params;
          componentProps['url'] = url;
          componentProps['allow'] = allow;
          componentProps['chartType'] = chartType;
          componentProps['templateId'] = templateId;
          componentProps['businessFlag'] = businessFlag;
          componentProps['account'] = account;
          fieldSchema['x-component-props'] = componentProps;
          field.componentProps = { ...componentProps };
          field.data = { v: uid() };
          dn.emit('patch', {
            schema: {
              'x-uid': fieldSchema['x-uid'],
              'x-component-props': componentProps,
            },
          });
        };

        return {
          title: t('Edit dataease embeding'),
          asyncGetInitialValues: async () => {
            const values = {
              url,
              chartType,
              templateId,
              businessFlag,
              account,
              height,
              params,
              allow,
            };
            return values;
          },
          schema: {
            type: 'object',
            title: t('Edit dataease embeding'),
            properties: {
              url: {
                ...urlSchema,
                required: true
              },
              chartType: {
                title: '{{t("Chart Type")}}',
                'x-component': 'Radio.Group',
                'x-decorator': 'FormItem',
                required: true,
                default: 'chart',
                enum: [
                  { value: 'dashboard', label: t('Dashboard') },
                  { value: 'chart', label: t('Chart') },
                  { value: 'screen', label: t('Big Screen') },
                ],
              },
              templateId: {
                title: '{{t("Template ID")}}',
                type: 'string',
                'x-component': 'Input',
                'x-decorator': 'FormItem',
                required: true,
                'x-component-props': {
                  placeholder: '{{t("Please enter template ID")}}',
                },
              },
              businessFlag: {
                title: '{{t("Business Flag")}}',
                type: 'string',
                'x-component': 'Input',
                'x-decorator': 'FormItem',
                required: true,
                'x-component-props': {
                  placeholder: '{{t("Please enter business flag")}}',
                },
              },
              account: {
                title: '{{t("Account")}}',
                type: 'string',
                'x-component': 'Input',
                'x-decorator': 'FormItem',
                required: true,
              },
              allow: {
                title: 'Allow',
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': (props) => {
                  return (
                    <Select
                      {...props}
                      allowClear
                      options={[
                        { value: 'autoplay', label: <AllowOptionsHelp type="autoplay" /> },
                        { value: 'camera', label: <AllowOptionsHelp type="camera" /> },
                        { value: 'document-domain', label: <AllowOptionsHelp type="document-domain" /> },
                        { value: 'encrypted-media', label: <AllowOptionsHelp type="encrypted-media" /> },
                        { value: 'fullscreen', label: <AllowOptionsHelp type="fullscreen" /> },
                        { value: 'geolocation', label: <AllowOptionsHelp type="geolocation" /> },
                        { value: 'microphone', label: <AllowOptionsHelp type="microphone" /> },
                        { value: 'midi', label: <AllowOptionsHelp type="midi" /> },
                        { value: 'payment', label: <AllowOptionsHelp type="payment" /> },
                      ]}
                    />
                  );
                },
                description: <AllowDescription />,
              },
              params: paramsSchema,
            },
          } as ISchema,
          onSubmit: submitHandler,
          noRecord: true,
          width: 600,
        };
      },
    },
    {
      name: 'setTheBlockHeight',
      Component: SchemaSettingsBlockHeightItem,
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'delete',
      type: 'remove',
      useComponentProps() {
        return {
          removeParentsIfNoChildren: true,
          breakRemoveOn: {
            'x-component': 'Grid',
          },
        };
      },
    },
  ],
};

export const dataeaseEmbedingBlockSchemaSettings = new SchemaSettings({
  name: 'blockSettings:dataease-embeding',
  ...commonOptions,
});
