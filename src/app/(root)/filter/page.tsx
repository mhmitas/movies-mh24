import React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


const page = () => {
    return (
        <div className="mt-20">
            <BlurredBackgroundDialog />
        </div>
    )
}

export default page

function BlurredBackgroundDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <h2 className="text-lg font-semibold">Dialog Title</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    This dialog has a blurred backdrop that helps focus attention on the dialog content.
                </p>
                <div className="mt-4 flex justify-end">
                    <Button>Continue</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}