"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (dates: { checkIn: string; checkOut: string }) => void;
  minDate?: string;
  pricePerNight?: number;
  blockedDates?: string[];
  dailyPrices?: Array<{ date: string; price: number }>;
  propertyId?: string;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  minDate,
  pricePerNight = 500,
  blockedDates = [],
  dailyPrices = [],
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Local date helper functions to avoid UTC/timezone confusion
  const getTodayLocal = () => {
    const now = new Date();
    return formatDateParts(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
    );
  };

  const formatDateParts = (year: number, month: number, day: number) => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const dateToLocalStr = (date: Date) => {
    return formatDateParts(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
  };

  const localStrToDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    setMounted(true);
    if (checkIn) {
      setCurrentMonth(localStrToDate(checkIn));
    }
    return () => setMounted(false);
  }, [checkIn]);

  useEffect(() => {
    if (isOpen && !checkIn) {
      setCurrentMonth(new Date());
    }
  }, [isOpen, checkIn]);

  const getDatePrice = (dateStr: string): number => {
    const dailyPrice = dailyPrices.find((dp) => dp.date === dateStr);
    return dailyPrice?.price || pricePerNight;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<{
      dateStr: string;
      dayNum: number;
      isCurrentMonth: boolean;
      isDisabled: boolean;
      isBlocked: boolean;
      price: number;
    }> = [];

    const todayStr = getTodayLocal();
    const effectiveMinDate = minDate || todayStr;

    // Previous month's days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      days.push({
        dateStr: formatDateParts(year, month, d), // Not strictly used for selection but helps grid
        dayNum: d,
        isCurrentMonth: false,
        isDisabled: true,
        isBlocked: false,
        price: pricePerNight,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateParts(year, month + 1, day);
      const isBlocked = blockedDates.includes(dateStr);
      const isDisabled = dateStr < effectiveMinDate || isBlocked;

      days.push({
        dateStr,
        dayNum: day,
        isCurrentMonth: true,
        isDisabled,
        isBlocked,
        price: getDatePrice(dateStr),
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        dateStr: formatDateParts(year, month + 2, day),
        dayNum: day,
        isCurrentMonth: false,
        isDisabled: true,
        isBlocked: false,
        price: pricePerNight,
      });
    }

    return days;
  };

  const handleDateClick = (dateStr: string, isDisabled: boolean) => {
    if (isDisabled) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      onChange({ checkIn: dateStr, checkOut: "" });
    } else {
      // Selecting end date
      if (dateStr < checkIn) {
        onChange({ checkIn: dateStr, checkOut: "" });
      } else if (dateStr === checkIn) {
        onChange({ checkIn: "", checkOut: "" });
      } else {
        // Check for blocked dates in the range
        let hasBlocked = false;
        const start = localStrToDate(checkIn);
        const end = localStrToDate(dateStr);
        const temp = new Date(start);

        while (temp <= end) {
          if (blockedDates.includes(dateToLocalStr(temp))) {
            hasBlocked = true;
            break;
          }
          temp.setDate(temp.getDate() + 1);
        }

        if (hasBlocked) {
          alert(
            "This range includes blocked dates. Please select another range.",
          );
          return;
        }

        onChange({ checkIn, checkOut: dateStr });
        setTimeout(() => setIsOpen(false), 400);
      }
    }
  };

  const isDateInRange = (dateStr: string) => {
    if (!checkIn) return false;
    if (checkOut) return dateStr >= checkIn && dateStr <= checkOut;
    if (hoverDate && hoverDate > checkIn)
      return dateStr >= checkIn && dateStr <= hoverDate;
    return dateStr === checkIn;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1,
  );

  const CalendarPopup = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle backdrop overlay to focus interaction */}
          <div
            className="fixed inset-0 z-[9998] bg-black/[0.05]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: -50, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            className="fixed z-[9999] left-1/2 top-1/2 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 w-[95vw] max-w-[800px] border border-gray-100 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Month */}
              <div className="flex-1 relative">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="absolute left-0 top-1 p-2 hover:bg-amber-50 rounded-full transition-colors text-amber-600 z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center mb-6 px-2">
                  <h4
                    className="font-bold text-gray-900 text-lg"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {currentMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {getDaysInMonth(currentMonth).map((day, i) => {
                    const start = checkIn === day.dateStr;
                    const end = checkOut === day.dateStr;
                    const inRange = isDateInRange(day.dateStr);

                    return (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() =>
                          !day.isDisabled && setHoverDate(day.dateStr)
                        }
                        onMouseLeave={() => setHoverDate(null)}
                        onClick={() =>
                          handleDateClick(day.dateStr, day.isDisabled)
                        }
                        disabled={day.isDisabled}
                        className={`
                          relative h-12 flex flex-col items-center justify-center transition-all text-sm
                          ${!day.isCurrentMonth ? "invisible" : ""}
                          ${day.isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-900 hover:bg-amber-50"}
                          ${inRange && !day.isDisabled ? "bg-amber-50" : "bg-white"}
                          ${start || end ? "bg-amber-500 text-white hover:bg-amber-600 z-10" : ""}
                          ${start && !end && checkOut ? "rounded-l-xl" : ""}
                          ${end && !start ? "rounded-r-xl" : ""}
                          ${start && end ? "rounded-xl" : ""}
                          ${!start && !end && inRange ? "border-y border-amber-100" : "rounded-lg"}
                        `}
                      >
                        <span className="font-bold">{day.dayNum}</span>
                        {day.isCurrentMonth && !day.isDisabled && (
                          <span
                            className={`text-[8px] mt-0.5 opacity-80 ${start || end ? "text-white" : "text-gray-500"}`}
                          >
                            {day.price >= 1000
                              ? `${(day.price / 1000).toFixed(1)}k`
                              : day.price}
                          </span>
                        )}
                        {day.isBlocked && !start && !end && (
                          <span className="absolute top-1 right-1 w-1 h-1 bg-red-400 rounded-full"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Month (visible on Desktop) */}
              <div className="flex-1 relative hidden md:block border-l border-gray-50 pl-8">
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="absolute right-0 top-1 p-2 hover:bg-amber-50 rounded-full transition-colors text-amber-600 z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center mb-6 px-2">
                  <h4
                    className="font-bold text-gray-900 text-lg"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {nextMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {getDaysInMonth(nextMonth).map((day, i) => {
                    const start = checkIn === day.dateStr;
                    const end = checkOut === day.dateStr;
                    const inRange = isDateInRange(day.dateStr);

                    return (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() =>
                          !day.isDisabled && setHoverDate(day.dateStr)
                        }
                        onMouseLeave={() => setHoverDate(null)}
                        onClick={() =>
                          handleDateClick(day.dateStr, day.isDisabled)
                        }
                        disabled={day.isDisabled}
                        className={`
                          relative h-12 flex flex-col items-center justify-center transition-all text-sm
                          ${!day.isCurrentMonth ? "invisible" : ""}
                          ${day.isDisabled ? "text-gray-300 cursor-not-allowed" : "text-gray-900 hover:bg-amber-50"}
                          ${inRange && !day.isDisabled ? "bg-amber-50" : "bg-white"}
                          ${start || end ? "bg-amber-500 text-white hover:bg-amber-600 z-10" : ""}
                          ${start && !end && checkOut ? "rounded-l-xl" : ""}
                          ${end && !start ? "rounded-r-xl" : ""}
                          ${start && end ? "rounded-xl" : ""}
                          ${!start && !end && inRange ? "border-y border-amber-100" : "rounded-lg"}
                        `}
                      >
                        <span className="font-bold">{day.dayNum}</span>
                        {day.isCurrentMonth && !day.isDisabled && (
                          <span
                            className={`text-[8px] mt-0.5 opacity-80 ${start || end ? "text-white" : "text-gray-500"}`}
                          >
                            {day.price >= 1000
                              ? `${(day.price / 1000).toFixed(1)}k`
                              : day.price}
                          </span>
                        )}
                        {day.isBlocked && !start && !end && (
                          <span className="absolute top-1 right-1 w-1 h-1 bg-red-400 rounded-full"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile View Indicators / Navigation */}
              <div className="md:hidden flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="flex items-center gap-1 text-xs font-bold text-amber-600"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="flex items-center gap-1 text-xs font-bold text-amber-600"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Blocked
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
                type="button"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">
        Stay Duration
      </label>
      <div
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all bg-white
          ${isOpen ? "border-amber-500 shadow-lg ring-4 ring-amber-50" : "border-gray-100 hover:border-amber-200"}
        `}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-2.5 rounded-xl transition-colors ${checkIn ? "bg-amber-100 text-amber-600" : "bg-gray-50 text-gray-300"}`}
          >
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              Check-in — Check-out
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold ${checkIn ? "text-gray-900" : "text-gray-300"}`}
              >
                {checkIn
                  ? localStrToDate(checkIn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Arrival Date"}
              </span>
              <span className="text-gray-200">—</span>
              <span
                className={`text-sm font-bold ${checkOut ? "text-gray-900" : "text-gray-300"}`}
              >
                {checkOut
                  ? localStrToDate(checkOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Departure Date"}
              </span>
            </div>
          </div>
        </div>

        {checkIn ? (
          <X
            className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onChange({ checkIn: "", checkOut: "" });
            }}
          />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-300" />
        )}
      </div>

      {mounted && typeof document !== "undefined"
        ? createPortal(CalendarPopup, document.body)
        : null}
    </div>
  );
}
