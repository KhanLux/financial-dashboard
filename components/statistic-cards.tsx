"use client"

import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react"

import { AnimatedContainer } from "@/components/ui/animated-container"
import { StatisticCard } from "@/components/ui/statistic-card"
import { useStatistics } from "@/hooks/use-statistics"
import { StatisticCardsProps } from "@/types/statistic-cards"

export function StatisticCards({ className }: StatisticCardsProps) {
  const { stats, isLoaded } = useStatistics()

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <AnimatedContainer animation="slide" delay="none" show={isLoaded}>
        <StatisticCard
          title="Total Income"
          value={stats.totalIncome}
          icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
          description="+20.1% from last month"
        />
      </AnimatedContainer>

      <AnimatedContainer animation="slide" delay="short" show={isLoaded}>
        <StatisticCard
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={<ArrowDownIcon className="h-4 w-4 text-red-500" />}
          description="+12.5% from last month"
        />
      </AnimatedContainer>

      <AnimatedContainer animation="slide" delay="medium" show={isLoaded}>
        <StatisticCard
          title="Net Income"
          value={stats.netIncome}
          icon={
            stats.netIncome >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )
          }
          description={`${stats.netIncome >= 0 ? "Positive" : "Negative"} balance`}
          valueClassName={stats.netIncome >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
        />
      </AnimatedContainer>
    </div>
  )
}

