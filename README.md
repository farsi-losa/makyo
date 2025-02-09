## Getting Started

this plugin using tailwind for the css style, so you need to install tailwind css first.

install the tailwind:

```bash
npm i tailwindcss
# or
yarn add tailwindcss
```

install the module:

```bash
npm i dropdown_search_react
# or
yarn add dropdown_search_react
```

props:
- options: array | list of options
- onReturnValue: function callback | a function to get selected option
- outline: boolean | dropdown style with border or no border
- multiple: boolean | enable multiple choice
- useSearch: boolean | enable search feature

example:
```bash
import { DropdownSearch } from "./general/dropdownSearch";

export function MyComponent() {
    const [valueFromChild, setValueFromChild] = useState<string[] | string>('');
    const list_options = ['option one', 'option two', 'option three', 'option four', 'option five'];

    const handleValueFromChild = (value: string[] | string) => {
        setValueFromChild(value);
        console.log('handleValueFromChild',value)
    };
   
    return (
        <DropdownSearch 
            options={list_options}
            outline={false}
            multiple={true}
            useSearch={true}
            onReturnValue={handleValueFromChild}
            />
    );
}
```
