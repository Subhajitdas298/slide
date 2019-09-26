export class OpenWeatherMapWeatherForecast {
    list: {
        dt: number;
        main: {
            temp_min: number;
            temp_max: number;
        };
        weather:{
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        clouds:{
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
        };
        dt_txt: string;
    }[];
    city:{
        id: number;
        name: string;
    };
}
