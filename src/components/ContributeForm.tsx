
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, UploadCloud } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  type: z.string().min(1, { message: 'Please select a type.' }),
  region: z.string().min(1, { message: 'Please select a region.' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  date: z.date().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  historicalSignificance: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContributeForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      region: '',
      location: '',
      description: '',
      historicalSignificance: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log('Form submitted:', data);
    
    // In a real app, this would send data to an API
    // For now, we'll just show a success toast
    toast.success('Contribution submitted!', {
      description: 'Thank you for contributing to Astitva. Your submission will be reviewed soon.',
    });
    
    form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-serif font-semibold mb-6">Share Your Cultural Knowledge</h2>
      <p className="text-muted-foreground mb-6">
        Help us build a comprehensive resource by contributing your local cultural knowledge. 
        Your submission will be reviewed before being added to our database.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Taj Mahal / Diwali Festival" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name of the monument, festival, art form, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monument">Monument</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="art">Art Form</SelectItem>
                      <SelectItem value="heritage">Heritage Site</SelectItem>
                      <SelectItem value="ritual">Ritual/Tradition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Category of the cultural element
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                      <SelectItem value="central">Central India</SelectItem>
                      <SelectItem value="northeast">Northeast India</SelectItem>
                      <SelectItem value="panIndia">Pan-India</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Geographic region of India
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormDescription>
                    City, state, or specific area
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date (for festivals/events)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Optional - for festivals or temporary events
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please provide a detailed description..." 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="historicalSignificance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Significance (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="History, stories, or significance..." 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
            <UploadCloud className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop images here or click to browse
            </p>
            <Button type="button" variant="outline" size="sm">
              Upload Images
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG or WEBP, max 5MB each (up to 5 images)
            </p>
          </div>
          
          <Button type="submit" className="w-full">Submit Contribution</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContributeForm;
