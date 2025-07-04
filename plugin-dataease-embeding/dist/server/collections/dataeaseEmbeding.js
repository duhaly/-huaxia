/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dataeaseEmbeding_exports = {};
__export(dataeaseEmbeding_exports, {
  default: () => dataeaseEmbeding_default
});
module.exports = __toCommonJS(dataeaseEmbeding_exports);
var import_database = require("@nocobase/database");
var dataeaseEmbeding_default = (0, import_database.defineCollection)({
  name: "dataeaseEmbeding",
  title: '{{t("Dataease Embeding")}}',
  shared: true,
  logging: true,
  createdBy: true,
  updatedBy: true,
  sortable: true,
  fields: [
    {
      type: "string",
      name: "appId",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("appId")}}',
        "x-component": "Input"
      }
    },
    {
      type: "string",
      name: "appSecret",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("appSecret")}}',
        "x-component": "Input"
      }
    },
    {
      type: "string",
      name: "account",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("account")}}',
        "x-component": "Input"
      }
    }
  ]
});
