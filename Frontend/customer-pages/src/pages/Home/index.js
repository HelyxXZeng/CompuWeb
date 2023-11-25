import { InfiSwiper } from '~/components/Swiper';
import Frame from '~/components/Frame';
import ProductItem from '~/components/ProductItem';

function Home() {
    return (
        <>
            <InfiSwiper />
            <Frame>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </Frame>
        </>
    );
}

export default Home;
