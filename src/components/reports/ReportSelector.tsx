import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ReportSelectorProps {
  onReportTypeChange?: (type: string) => void;
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
  onExport?: () => void;
}

const ReportSelector = ({
  onReportTypeChange = () => {},
  onDateRangeChange = () => {},
  onExport = () => {},
}: ReportSelectorProps) => {
  const [reportType, setReportType] = useState("daily");
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleReportTypeChange = (value: string) => {
    setReportType(value);
    onReportTypeChange(value);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const newDate = { ...date };

    if (!date.from || date.to) {
      newDate.from = selectedDate;
      newDate.to = selectedDate;
    } else if (selectedDate < date.from) {
      newDate.from = selectedDate;
    } else {
      newDate.to = selectedDate;
    }

    setDate(newDate);
    onDateRangeChange(newDate);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <Tabs
              defaultValue="daily"
              value={reportType}
              onValueChange={handleReportTypeChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="daily">Harian</TabsTrigger>
                <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                <TabsTrigger value="products">Produk</TabsTrigger>
                <TabsTrigger value="predictions">Prediksi AI</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "d MMM yyyy", { locale: id })} -{" "}
                        {format(date.to, "d MMM yyyy", { locale: id })}
                      </>
                    ) : (
                      format(date.from, "d MMM yyyy", { locale: id })
                    )
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date.from}
                  selected={date}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDate({ from: range.from, to: range.to });
                      onDateRangeChange({ from: range.from, to: range.to });
                    }
                  }}
                  numberOfMonths={2}
                  locale={id}
                />
              </PopoverContent>
            </Popover>

            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Transaksi</SelectItem>
                  <SelectItem value="cash">Tunai</SelectItem>
                  <SelectItem value="ewallet">E-Wallet</SelectItem>
                  <SelectItem value="transfer">Transfer Bank</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSelector;
