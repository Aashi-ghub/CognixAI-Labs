"use client"

import { createContext, useContext, ReactNode } from "react"
import { WorkflowAnalysisFormRef } from "@/components/workflow-analysis-form"
import { ConsultationPopupRef } from "@/components/consultation-popup"

interface ConsultationPopupContextType {
  workflowAnalysisRef: React.MutableRefObject<WorkflowAnalysisFormRef | null>
  consultationPopupRef: React.MutableRefObject<ConsultationPopupRef | null>
}

const ConsultationPopupContext = createContext<ConsultationPopupContextType | null>(null)

export function ConsultationPopupProvider({ 
  children, 
  workflowAnalysisRef,
  consultationPopupRef
}: { 
  children: ReactNode
  workflowAnalysisRef: React.MutableRefObject<WorkflowAnalysisFormRef | null>
  consultationPopupRef: React.MutableRefObject<ConsultationPopupRef | null>
}) {
  return (
    <ConsultationPopupContext.Provider value={{ workflowAnalysisRef, consultationPopupRef }}>
      {children}
    </ConsultationPopupContext.Provider>
  )
}

export function useConsultationPopup() {
  const context = useContext(ConsultationPopupContext)
  if (!context) {
    // Return a no-op function if context is not available
    return { 
      openWorkflowAnalysis: () => {},
      openConsultationPopup: () => {}
    }
  }
  return {
    openWorkflowAnalysis: () => {
      context.workflowAnalysisRef.current?.open()
    },
    openConsultationPopup: () => {
      context.consultationPopupRef.current?.open()
    }
  }
}

