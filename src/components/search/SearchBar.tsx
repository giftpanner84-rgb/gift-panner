import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = 'ابحث باسم المنتج أو ASIN...' }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute right-3 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pr-10 pl-20 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-24 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <Button 
          type="submit" 
          className="absolute left-2 bg-blue-600 hover:bg-blue-700"
        >
          بحث
        </Button>
      </div>
    </form>
  );
};
