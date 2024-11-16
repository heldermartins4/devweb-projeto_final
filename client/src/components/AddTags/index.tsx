import * as C from "./styles"

import * as content from "../../lib/document.json";

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { shade } from "polished";
import { useContext, useState } from "react";
import { ThemeContext } from "styled-components";

export const Tags = () => {

    const { colors } = useContext(ThemeContext);

    // criar novas tags
    const [tag, setTag] = useState("");

    const createTags = (e) => {
        setTag(e.target.value);
    }
    // console.log(tag);

    // mostrar tags
    const [ tags, showTags ] = useState(false);

    return (
        <C.Container>
            <C.AddTag>
                <input 
                    type="text" 
                    placeholder="Insira sua tag" 
                    value={tag}
                    onChange={createTags}
                />
            </C.AddTag>
            <C.ContainerTags tags={tags}>
                    {content.tags.map((index) => {
                        return (
                            <li>
                                {index.name} 
                                <span>
                                    <FontAwesomeIcon icon={faXmark}  style={{marginLeft: 10}} />
                                </span>
                            </li>
                        )
                    })}
                </C.ContainerTags>
        </C.Container>
    )
}