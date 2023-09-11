"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiRepeat } from "react-icons/fi";
import type { ZodIssue } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function ErrorToast({
  error,
  place,
}: {
  error: string | ZodIssue[];
  place: string,
}) {
  const { toast } = useToast();
  const router = useRouter();

  const messageError = React.useMemo(
    function generateMessageError() {
      if (typeof error === "string") {
        return error;
      } else {
        const messageslist = error.map((issue) => {
          const message = issue.message;
          return message;
        });
        return messageslist;
      }
    },
    [error],
  );

  React.useEffect(() => {
    toast({
      variant: "destructive",
      title: "Ошибка! Что-то пошло не так:",
      description: <p>In {place}: {messageError}</p>,
      className: "font-Inter",
      action: (
        <ToastAction
          className="px-2 py-6 text-sm"
          altText={"Попробовать снова"}
          onClick={() => router.refresh()}
        >
          <FiRepeat className="h-8 w-8" />
        </ToastAction>
      ),
    });
  }, [messageError, place, router, toast]);

  return null
}
