import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar as CalendarIcon, Landmark, Users, CreditCard, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { culturalSites } from '@/data/culturalData';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import ChatBot from '@/components/ChatBot';

// Define form schema
const formSchema = z.object({
  monumentId: z.string({
    required_error: "Please select a monument",
  }),
  date: z.date({
    required_error: "Please select a date for your visit",
  }),
  ticketType: z.string({
    required_error: "Please select a ticket type",
  }),
  quantity: z.coerce.number().min(1).max(10, {
    message: "Please select between 1 and 10 tickets",
  }),
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

const TICKET_TYPES = [
  { id: "standard", name: "Standard", price: 500 },
  { id: "student", name: "Student", price: 250 },
  { id: "foreigner", name: "Foreigner", price: 1000 },
  { id: "senior", name: "Senior Citizen", price: 200 },
];

const Booking: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preselectedMonumentId = queryParams.get('monument') || '';
  const [selectedTicketType, setSelectedTicketType] = useState(TICKET_TYPES[0]);
  
  // Only include monuments category in the booking options
  const bookableMonuments = culturalSites.filter(site => site.category === 'monument');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monumentId: preselectedMonumentId,
      ticketType: "standard",
      quantity: 1,
      fullName: "",
      email: "",
      phone: "",
    },
  });

  // Watch for ticket type changes
  const ticketType = form.watch("ticketType");
  const quantity = form.watch("quantity");

  // Update selected ticket type when form value changes
  React.useEffect(() => {
    const selected = TICKET_TYPES.find(type => type.id === ticketType);
    if (selected) {
      setSelectedTicketType(selected);
    }
  }, [ticketType]);

  // Calculate total price
  const calculateTotal = () => {
    return selectedTicketType.price * quantity;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Show success toast
    toast.success("Booking successful!", {
      description: `Your tickets for ${bookableMonuments.find(m => m.id === values.monumentId)?.name} have been booked. Check your email for confirmation.`,
      duration: 5000,
    });

    // Reset form
    form.reset();
    
    // Navigate to a thank you page or back to home
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/4">
          <SideBar />
        </div>
        
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-serif font-semibold mb-6">Monument Ticket Booking</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Book Tickets
                </CardTitle>
                <CardDescription>
                  Fill in the form below to book tickets for your visit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="monumentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monument</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a monument" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {bookableMonuments.map(monument => (
                                  <SelectItem 
                                    key={monument.id} 
                                    value={monument.id}
                                  >
                                    {monument.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the monument you wish to visit
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Visit Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => 
                                    date < new Date() || // Can't book in the past
                                    date > new Date(new Date().setMonth(new Date().getMonth() + 3)) // Max 3 months in advance
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Tickets can be booked up to 3 months in advance
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="ticketType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ticket Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ticket type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TICKET_TYPES.map(type => (
                                  <SelectItem key={type.id} value={type.id}>
                                    {type.name} (₹{type.price})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Discounts available for students and senior citizens
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Tickets</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" max="10" {...field} />
                            </FormControl>
                            <FormDescription>
                              Maximum 10 tickets per booking
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                Booking confirmation will be sent here
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Complete Booking
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Ticket Type:</span>
                  <span className="font-medium">{selectedTicketType.name}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Price per ticket:</span>
                  <span className="font-medium">₹{selectedTicketType.price}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity || 0}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Booking Fee:</span>
                  <span className="font-medium">₹20</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-lg">₹{calculateTotal() + 20}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-xs text-gray-500">
                  <p>• Booking is confirmed instantly</p>
                  <p>• Free cancellation up to 24 hours before visit</p>
                  <p>• Please bring your ID for student/senior discounts</p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="h-4 w-4" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default Booking;
