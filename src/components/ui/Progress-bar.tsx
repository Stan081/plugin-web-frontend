"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"

interface ProgressDemoProps {
  max: number;
  currentProgress: number;
}

export function ProgressDemo({ max, currentProgress }: ProgressDemoProps) {
  const [progress, setProgress] = React.useState(currentProgress)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(Math.min(currentProgress, max)), 500)
    return () => clearTimeout(timer)
  }, [currentProgress, max])

  return <Progress value={progress} max={max} className="w-[60%]" />
}
