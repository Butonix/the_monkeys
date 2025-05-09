"use client";

import * as React from "react";

import { DayPicker, type DropdownProps } from "react-day-picker";
import { buttonVariants } from "../atoms/button";
import { ScrollArea } from "../atoms/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../atoms/select";
import { AngleLeft, AngleRight } from "../icons";
import { cn } from "../utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"px-4 py-2 bg-background-light dark:bg-background-dark border border-foreground-light dark:border-foreground-dark rounded-md shadow-md",
				className,
			)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				caption_dropdowns: "flex justify-center gap-1",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"size-8 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex space-x-1",
				head_cell:
					"font-dm_sans text-text-light/80 dark:text-text-dark/80 rounded-md w-9 font-normal text-sm",
				row: "flex w-full mt-2 space-x-1",
				cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
				day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0"),
				day_selected:
					"bg-foreground-light dark:bg-foreground-dark hover:bg-primary",
				day_today: "bg-accent text-accent-foreground",
				day_outside: "opacity-50",
				day_disabled: "opacity-50",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				Dropdown: ({ value, onChange, children }: DropdownProps) => {
					const options = React.Children.toArray(
						children,
					) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];

					const selected = options.find((child) => child.props.value === value);

					const handleChange = (value: string) => {
						const changeEvent = {
							target: { value },
						} as React.ChangeEvent<HTMLSelectElement>;
						onChange?.(changeEvent);
					};

					return (
						<Select
							value={value?.toString()}
							onValueChange={(value) => {
								handleChange(value);
							}}
						>
							<SelectTrigger className="font-dm_sans bg-background-light dark:bg-background-dark">
								<SelectValue>{selected?.props?.children}</SelectValue>
							</SelectTrigger>

							<SelectContent position="popper">
								<ScrollArea className="h-[200px] m-0 outline-none">
									{options.map((option, id: number) => (
										<SelectItem
											key={`${option.props.value}-${id}`}
											value={option.props.value?.toString() ?? ""}
										>
											{option.props.children}
										</SelectItem>
									))}
								</ScrollArea>
							</SelectContent>
						</Select>
					);
				},
				IconLeft: () => <AngleLeft size={18} />,
				IconRight: () => <AngleRight size={18} />,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
