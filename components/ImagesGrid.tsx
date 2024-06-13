import * as React from "react";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
    images: string[];
    model: string;
    id?: number;
}

export const ImagesGrid = (props: Props) => {
    const {images, model, id, ...rest} = props;
    return (
        <section id='images-grid'>

        </section>
    );
};
