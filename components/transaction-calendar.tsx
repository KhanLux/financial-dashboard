"use client"

import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { CalendarTransactionList } from "@/components/ui/calendar-transaction-list"
import { useTransactionCalendar } from "@/hooks/use-transaction-calendar"
import { TransactionCalendarProps } from "@/types/transaction-calendar"

export function TransactionCalendar({ className }: TransactionCalendarProps) {
  const {
    selectedDate,
    setSelectedDate,
    selectedDayTransactions,
    isLoaded,
    isTransactionsLoaded,
    transactionDates,
  } = useTransactionCalendar()

  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      <AnimatedContainer animation="slide" direction="left" show={isLoaded}>
        <Card>
          <CardHeader>
            <CardTitle>Transaction Calendar</CardTitle>
            <CardDescription>View your transactions by date</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="rounded-md border bg-card p-1 w-full">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                classNames={{
                  months: "w-full",
                  month: "w-full space-y-4",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  row: "flex w-full mt-2 justify-between",
                  head_row: "flex w-full justify-between",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
                  table: "w-full border-collapse space-y-1",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 w-9",
                }}
                components={{
                  DayContent: ({ date }) => {
                    const dateStr = format(date, "yyyy-MM-dd")
                    const hasTransactions = transactionDates[dateStr]

                    return (
                      <div className="relative flex h-9 w-9 items-center justify-center">
                        <span className="z-10">{date.getDate()}</span>
                        {hasTransactions && (
                          <div className="absolute bottom-1 flex gap-1 z-0">
                            {hasTransactions.expense && <div className="h-1.5 w-1.5 rounded-full bg-destructive" />}
                            {hasTransactions.income && <div className="h-1.5 w-1.5 rounded-full bg-green-500" />}
                          </div>
                        )}
                      </div>
                    )
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer animation="slide" direction="right" show={isLoaded}>
        <Card>
          <CardHeader>
            <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}</CardTitle>
            <CardDescription>Transactions for this date</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarTransactionList
              transactions={selectedDayTransactions}
              isLoaded={isTransactionsLoaded}
              selectedDate={selectedDate}
            />
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}

