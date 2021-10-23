import {useEffect, useState} from "react";
import useAppContext from "./use-app-context";

const getContent = ({contentName, sectionName, sections}) => {
  if(!sections) { return; }

  const section = sections.find(({name}) => name === sectionName);
  if(!section) { return; }

  const content = section.contents.find(({name}) => name === contentName);
  if(!content) { return; }

  return content;
};

export default function useContent(sectionName, contentName) {
  const [{sections}] = useAppContext();
  const [value, setValue] = useState(getContent({contentName, sectionName, sections})?.value);

  useEffect(() => {
    const content = getContent({contentName, sectionName, sections});

    if(!content) { return; }
    if(content.value === value) { return; }

    setValue(content.value);
  }, [sections]);

  return value;
}
