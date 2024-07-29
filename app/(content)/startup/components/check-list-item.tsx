import * as React from "react";
import { Check, XIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  text: string;
  href: string;
  done: boolean;
};

export function CheckListItem({ text, href, done }: Props) {
  const bgColor = done
    ? "bg-green-500 dark:bg-green-700"
    : "bg-gray-300 dark:bg-gray-700";
  const Icon = done ? Check : XIcon;

  return (
    <li className={`${bgColor} rounded-md`}>
      <Link href={href}>
        <div className="flex items-center gap-3 p-2">
          <div className="">
            <Icon className="h-6 w-6" />
          </div>
          <div className={`md:text-center`}>
            <span>{text}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
