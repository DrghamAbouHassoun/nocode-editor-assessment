import type { ElementInfo } from '@/types/editor'

interface SourceLocation {
  fileName: string
  lineNumber: number
  columnNumber: number
}


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
    if (key.toString().startsWith("__reactFiber$") || key.toString().startsWith("__reactInternalInstance$")) {
      return (node as any)[key];
    }
  }
  return null;
}

function extractSourceFromDebugStack(debugStack?: Error) {
  if (!debugStack || !debugStack.stack) return null;

  const stackLines = debugStack.stack.split('\n');

  for (const line of stackLines) {
    const match = line.match(/\((.*):(\d+):(\d+)\)/);
    if (match) {
      return {
        fileName: match[1],
        lineNumber: parseInt(match[2], 10),
        columnNumber: parseInt(match[3], 10)
      };
    }
  }

  return null;
}

export function getElementInfo(element: HTMLElement): ElementInfo {
  const fiber = getReactFiberFromDom(element);

let source = null;
if (fiber?._debugStack) {
  source = extractSourceFromDebugStack(fiber._debugStack);
}
  console.log('getElementInfo: ', extractSourceFromDebugStack(fiber?._debugStack))

  const elementInfo = extractSourceFromDebugStack(fiber?._debugStack)
  
  return {
    componentName: 'MOCK_COMPONENT',
    position: {
      line: elementInfo?.lineNumber || 0,
      column: elementInfo?.columnNumber || 0,
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
