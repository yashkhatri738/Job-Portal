"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ShieldAlert, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
  employerData: any
}

const EmployerProfileCompletionStatus = ({ employerData }: Props) => {
  const router = useRouter()

  const employer = employerData || {}
  console.log("Employer Data in Profile Status:", employer)

  // Data for profile fields
  const profileFields = [
    { label: "Company Name", completed: employer.companyName ? true : false },
    { label: "Company Address", completed: employer.location ? true : false },
    { label: "Description", completed: employer.description ? true : false },
    { label: "Team Size", completed: employer.teamSize ? true : false },
    { label: "Year of Establishment", completed: employer.yearOfEstablishment ? true : false },
    { label: "Website", completed: employer.websiteUrl ? true : false },
    { label: "Logo", completed: employer.bannerImageUrl ? true : false },
    { label: "Organization Type", completed: employer.organizationType ? true : false },
  ]

  // Auto calculate completion %
  const completedCount = profileFields.filter(f => f.completed).length
  const profileCompletion = Math.round(
    (completedCount / profileFields.length) * 100
  )

  const isCompleted = profileCompletion === 100

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Profile Completion Status
        </CardTitle>

        {isCompleted ? (
          <Badge className="bg-green-600">Completed</Badge>
        ) : (
          <Badge variant="destructive">Incomplete</Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Status Message */}
        <div className="flex items-center gap-3">
          {isCompleted ? (
            <CheckCircle2 className="text-green-600" />
          ) : (
            <ShieldAlert className="text-destructive" />
          )}

          <p className="text-sm text-muted-foreground">
            {isCompleted
              ? "Your employer profile is fully completed."
              : "Please complete your profile to start hiring without restrictions."}
          </p>
        </div>

        {/* Progress + CTA */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>Profile Completion</span>
            <span className="font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} />
        </div>

        {/* Expandable Checklist */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="profile-fields">
            <AccordionTrigger className="text-sm font-medium">
              View Profile Fields Status
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex flex-col gap-3 pt-2">
                {profileFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{field.label}</span>

                    {field.completed ? (
                      <span className="text-green-600">✓ Completed</span>
                    ) : (
                      <span className="text-destructive">✕ Pending</span>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="mt-3 w-fit"
                  onClick={() => router.push("/employer/settings")}
                >
                  {isCompleted ? "Update Profile" : "Complete Your Profile"}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default EmployerProfileCompletionStatus
