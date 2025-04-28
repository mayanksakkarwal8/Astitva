
import React from 'react';
import { Check, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { regions, cultures, religions } from '@/data/culturalData';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface FilterOptionsProps {
  onFilterChange?: (filterType: string, value: string) => void;
  activeFilters?: {
    region?: string;
    culture?: string;
    religion?: string;
    category?: string;
  };
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ 
  onFilterChange = () => {}, 
  activeFilters = {} 
}) => {
  const { t } = useLanguage();
  const categories = [
    { id: 'monument', name: t('monuments') },
    { id: 'festival', name: t('festivals') },
    { id: 'art', name: t('arts') },
    { id: 'heritage', name: t('heritageSites') }
  ];

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1 border-dashed">
          <Filter className="h-3.5 w-3.5" />
          <span>{t('filters')}</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Tabs defaultValue="category">
          <div className="border-b px-3">
            <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
              <TabsTrigger value="category" className="rounded-none px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                {t('categories')}
              </TabsTrigger>
              <TabsTrigger value="religion" className="rounded-none px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                {t('religions')}
              </TabsTrigger>
              <TabsTrigger value="culture" className="rounded-none px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                {t('cultures')}
              </TabsTrigger>
              <TabsTrigger value="region" className="rounded-none px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                {t('regions')}
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Categories Tab */}
          <TabsContent value="category" className="p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => onFilterChange('category', category.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 border rounded-sm flex items-center justify-center ${
                          activeFilters.category === category.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                        }`}>
                          {activeFilters.category === category.id && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{category.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </TabsContent>

          {/* Religions Tab */}
          <TabsContent value="religion" className="p-0">
            <Command>
              <CommandInput placeholder={t('searchReligions')} />
              <CommandList>
                <CommandEmpty>{t('noReligionsFound')}</CommandEmpty>
                <CommandGroup>
                  {religions.map((religion) => (
                    <CommandItem
                      key={religion.id}
                      onSelect={() => onFilterChange('religion', religion.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 border rounded-sm flex items-center justify-center ${
                          activeFilters.religion === religion.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                        }`}>
                          {activeFilters.religion === religion.id && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{religion.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </TabsContent>

          {/* Cultures Tab */}
          <TabsContent value="culture" className="p-0">
            <Command>
              <CommandInput placeholder={t('searchCultures')} />
              <CommandList>
                <CommandEmpty>{t('noCulturesFound')}</CommandEmpty>
                <CommandGroup>
                  {cultures.map((culture) => (
                    <CommandItem
                      key={culture.id}
                      onSelect={() => onFilterChange('culture', culture.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 border rounded-sm flex items-center justify-center ${
                          activeFilters.culture === culture.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                        }`}>
                          {activeFilters.culture === culture.id && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{culture.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </TabsContent>

          {/* Regions Tab */}
          <TabsContent value="region" className="p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {regions.map((region) => (
                    <CommandItem
                      key={region.id}
                      onSelect={() => onFilterChange('region', region.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 border rounded-sm flex items-center justify-center ${
                          activeFilters.region === region.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                        }`}>
                          {activeFilters.region === region.id && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{region.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </TabsContent>
        </Tabs>
        
        <div className="p-3 flex justify-between items-center border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              // Clear all filters
              onFilterChange('clear', '');
            }}
          >
            {t('clearFilters')}
          </Button>
          <div className="text-xs text-muted-foreground">
            {activeFilterCount === 0 
              ? t('noActiveFilters') 
              : `${activeFilterCount} ${activeFilterCount === 1 ? t('activeFilter') : t('activeFilters')}`}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterOptions;
