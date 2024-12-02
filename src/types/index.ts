export type AutocompleteProps = {
    placeholder?: string;
    lang?: string;
    dir?: 'ltr' | 'rtl';
}

export type SearchResult = {
    id: string;
    title: string;
}
  
export type UseAutocompleteParams = {
    apiUrl: string;
}