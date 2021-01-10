import {useContext, useEffect, useState} from "react";
import {Context} from "app";

const getContent = ({contentName, sectionName, sections}) => {
  if(!sections) { return; }

  const section = sections.find(({name}) => name === sectionName);
  if(!section) { return; }

  const content = section.contents.find(({name}) => name === contentName);
  if(!content) { return; }

  return content;
};

export default function useContent(sectionName, contentName) {
  const [{sections}] = useContext(Context);
  const [value, setValue] = useState(getContent({contentName, sectionName, sections})?.value);

  useEffect(() => {
    const content = getContent({contentName, sectionName, sections});

    if(!content) { return; }
    if(content.value === value) { return; }

    setValue(content.value);
  }, [sections]);

  return value;
}
