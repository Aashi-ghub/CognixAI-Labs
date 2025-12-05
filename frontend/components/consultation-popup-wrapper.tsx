"use client"

import { useRef } from "react"
import { ConsultationPopupProvider } from "@/lib/consultation-popup-context"
import ConsultationPopup, { ConsultationPopupRef } from "@/components/consultation-popup"
import WorkflowAnalysisForm, { WorkflowAnalysisFormRef } from "@/components/workflow-analysis-form"

export default function ConsultationPopupWrapper({ children }: { children: React.ReactNode }) {
  const workflowAnalysisRef = useRef<WorkflowAnalysisFormRef>(null)
  const consultationPopupRef = useRef<ConsultationPopupRef>(null)

  return (
    <ConsultationPopupProvider 
      workflowAnalysisRef={workflowAnalysisRef}
      consultationPopupRef={consultationPopupRef}
    >
      {children}
      <ConsultationPopup ref={consultationPopupRef} />
      <WorkflowAnalysisForm ref={workflowAnalysisRef} />
    </ConsultationPopupProvider>
  )
}

