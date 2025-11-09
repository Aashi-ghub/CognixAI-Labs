"use client"

import { createContext, useContext, ReactNode } from "react"
import { WorkflowAnalysisFormRef } from "@/components/workflow-analysis-form"

interface ConsultationPopupContextType {
  workflowAnalysisRef: React.MutableRefObject<WorkflowAnalysisFormRef | null>
}

const ConsultationPopupContext = createContext<ConsultationPopupContextType | null>(null)

export function ConsultationPopupProvider({ 
  children, 
  workflowAnalysisRef 
}: { 
  children: ReactNode
  workflowAnalysisRef: React.MutableRefObject<WorkflowAnalysisFormRef | null>
}) {
  return (
    <ConsultationPopupContext.Provider value={{ workflowAnalysisRef }}>
      {children}
    </ConsultationPopupContext.Provider>
  )
}

export function useConsultationPopup() {
  const context = useContext(ConsultationPopupContext)
  if (!context) {
    // Return a no-op function if context is not available
    return { openWorkflowAnalysis: () => {} }
  }
  return {
    openWorkflowAnalysis: () => {
      context.workflowAnalysisRef.current?.open()
    }
  }
}

