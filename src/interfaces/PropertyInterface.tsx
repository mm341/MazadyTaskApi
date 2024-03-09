interface option {
  child: boolean;
  id: number;
  name: string;
  parent: number;
  slug: string;
}

interface CategoryProperty {
  description: string;
  id: number;
  list: boolean;
  name: string;
  other_value: string;
  parent: string;
  slug: string;
  type: string;
  value: string;
  options: option[];
}
