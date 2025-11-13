'use client'

import { useCallback } from 'react'
import ElementSelector from './ElementSelector'
import type { ElementInfo, EditorMessage } from '@/types/editor'

// Sample components for testing
import HeroSection from './demo/HeroSection'
import FeatureGrid from './demo/FeatureGrid'
import Footer from './demo/Footer'

interface SandboxAppProps {
  isEditMode: boolean
}

export default function SandboxApp({ isEditMode }: SandboxAppProps) {
    // Send element info to parent window
  const handleElementSelected = (info: ElementInfo) => {

    window.parent.postMessage({
      type: "ELEMENT_SELECTED",
      payload: info
    }, "*")
  };

  return (
    <div className="min-h-screen bg-white">
      <ElementSelector isEnabled={isEditMode} onElementSelected={handleElementSelected} />

      {/* Sample application content */}
      <HeroSection />
      <FeatureGrid />
      <Footer />
    </div>
  )
}
