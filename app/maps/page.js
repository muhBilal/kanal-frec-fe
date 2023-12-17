import Layouts from "@/app/Components/layouts";
import MapComponent from "@/app/maps/map";

export default function Page() {
    const defaultLat = -7.331676044716694;
    const defaultLng = 112.7884932961585;

    return (
        <div>
            <Layouts>
                <h1 className={`text-2xl font-semibold`}>Maps</h1>
                <MapComponent defaultLat={defaultLat} defaultLng={defaultLng} />
            </Layouts>
        </div>
    )
}