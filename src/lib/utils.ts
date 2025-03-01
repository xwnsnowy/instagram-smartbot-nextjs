import { TriggerType } from "@/types/trigger";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}


export const getMonth = (month: number) => {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (month < 1 || month > 12) {
    return 'Invalid month number. Please enter a number between 1 and 12.'
  }

  return months[month - 1]
}

export const duplicateValidation = (array: TriggerType[], element: TriggerType): TriggerType[] => {
  // Kiểm tra xem phần tử (element) có tồn tại trong mảng (array) hay không
  if (!array.find((existingElement) => existingElement === element)) {
    array.push(element);
    return array;
  } else {
    // Nếu tồn tại, loại bỏ phần tử đó ra khỏi mảng
    array = array.filter((existingElement) => existingElement !== element);
    return array;
  }
}
