import { Feather, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <Feather name="home" size={26} {...props} />,
    messages: (props)=> <Feather name="compass" size={26} {...props} />,
    products: (props)=> <MaterialCommunityIcons name="cards" size={26} {...props} />,
    wallet: (props)=> <Foundation name="indent-more" size={26} {...props} />,
}