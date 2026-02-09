import EmployerProfileCompletionStatus from "@/components/UI Components/employer/profileStatus"
import { getEmployerDetails } from "@/lib/actions/employer/employerDetails"

const EmployerProfile = async () => {    
    const employerData = await getEmployerDetails();

  return (
    <EmployerProfileCompletionStatus employerData={employerData} />
  )
}

export default EmployerProfile;
