import styles from "./HeroVideo.module.css";

type Props ={
    videoSrc:string;
    title:string;
};
export const HeroVideo = ({videoSrc, title}: Props) => {
    return (
        <div>
        <video className={styles.video}src={videoSrc} autoPlay loop muted playsInline/>
        <h1 className={styles.title}> {title}</h1>
        </div>
    );
};
