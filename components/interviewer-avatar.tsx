import { UserRound } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function InterviewerAvatar() {
  return (
    <Avatar className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <AvatarFallback>
        <UserRound className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  )
}
