import type { ElementInfo } from '@/types/editor'

function getParentChain(element: HTMLElement): string[] {
  const chain: string[] = []
  let currentElement: HTMLElement | null = element
  while (currentElement) {
    chain.push(currentElement.tagName.toLowerCase())
    currentElement = currentElement.parentElement as HTMLElement
  }
  return chain
}

function getReactFiberFromDom(node: HTMLElement) {
  for (const key in node as any) {
    if (key.startsWith("__reactFiber$")) {
      return (node as any)[key];
    }
  }
  return null;
}

export function getElementInfo(element: HTMLElement): ElementInfo {
  console.log('getElementInfo: ', getReactFiberFromDom(element))
  
  return {
    componentName: 'MOCK_COMPONENT',
    position: {
      line: 0,
      column: 0,
    },
    parentChain: getParentChain(element).reverse(),
    computedStyles: getComputedStylesObject(element),
    tagName: element.tagName.toLowerCase(),
  }
}

// Helper: Extract computed CSS styles from an element
export function getComputedStylesObject(element: HTMLElement): Record<string, string> {
  const computed = window.getComputedStyle(element)
  const styles: Record<string, string> = {}

  const properties = [
    'display',
    'position',
    'width',
    'height',
    'padding',
    'margin',
    'border',
    'backgroundColor',
    'color',
    'fontSize',
    'fontFamily',
    'fontWeight',
    'lineHeight',
    'textAlign',
    'flexDirection',
    'justifyContent',
    'alignItems',
    'gap',
    'zIndex',
    'opacity',
    'transform',
    'transition',
  ]

  properties.forEach(prop => {
    styles[prop] = computed.getPropertyValue(prop)
  })

  return styles
}
