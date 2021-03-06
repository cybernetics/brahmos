// @flow
import TemplateTag from './TemplateTag';
import { brahmosNode, TAG_NODE } from './brahmosNode';
import type { TemplateTagType, BrahmosNode } from './flow.types';

const templateTagCache = new WeakMap();

export function createTagNode(template: TemplateTagType, values: Array<any>): BrahmosNode {
  const node = brahmosNode(null, values, '');

  node.nodeType = TAG_NODE;
  node.template = template;

  return node;
}

export function html(strings: Array<string>, ...values: Array<any>): BrahmosNode {
  let template = templateTagCache.get(strings);

  if (!template) {
    template = new TemplateTag(strings);
    templateTagCache.set(strings, template);
  }

  return createTagNode(template, values);
}
