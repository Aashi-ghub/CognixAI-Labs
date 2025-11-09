"use client"

import { useRef } from "react"
import { ConsultationPopupProvider } from "@/lib/consultation-popup-context"
import ConsultationPopup from "@/components/consultation-popup"
import WorkflowAnalysisForm, { WorkflowAnalysisFormRef } from "@/components/workflow-analysis-form"

export default function ConsultationPopupWrapper({ children }: { children: React.ReactNode }) {
  const workflowAnalysisRef = useRef<WorkflowAnalysisFormRef>(null)

  return (
    <ConsultationPopupProvider workflowAnalysisRef={workflowAnalysisRef}>
      {children}
      <ConsultationPopup />
      <WorkflowAnalysisForm ref={workflowAnalysisRef} />
    </ConsultationPopupProvider>
  )
}

