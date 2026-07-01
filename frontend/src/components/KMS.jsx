import KMS_FG from "../assets/kms/kms.svg";
import KMS_BG from "../assets/kms/kms_bg.svg";

export default function KMS(props) {
    return (
        <div class={`relative ${props.class}`}>
            <img
                src={KMS_BG}
                class={`absolute top-0 left-0 animate-pulse w-full h-full`}
            ></img>
            <img
                src={KMS_FG}
                class={`absolute top-0 left-0 w-full h-full`}
            ></img>
        </div>
    );
}
