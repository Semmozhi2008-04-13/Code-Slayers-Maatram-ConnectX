import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CURRENT_USER } from "@/lib/data";
import { Image as ImageIcon, Video, Calendar } from "lucide-react";

export default function CreatePost() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Image
            src={CURRENT_USER.avatarUrl}
            alt={CURRENT_USER.name}
            width={48}
            height={48}
            className="rounded-full"
            data-ai-hint="profile avatar"
          />
          <Input
            placeholder={`What's on your mind, ${CURRENT_USER.name.split(" ")[0]}?`}
            className="h-12 rounded-full"
          />
        </div>
        <div className="mt-4 flex justify-around">
          <Button variant="ghost" className="flex-1">
            <ImageIcon className="mr-2 h-5 w-5 text-blue-500" /> Photo
          </Button>
          <Button variant="ghost" className="flex-1">
            <Video className="mr-2 h-5 w-5 text-green-500" /> Video
          </Button>
          <Button variant="ghost" className="flex-1">
            <Calendar className="mr-2 h-5 w-5 text-orange-500" /> Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
