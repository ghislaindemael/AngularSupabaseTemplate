import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: "root",
})
export class CookieService {
    private readonly storage: Storage | null = null;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.storage = localStorage;
        }
    }

    setItem(key: string, value: any): void {
        const dataWithTimestamp = {
            value: value,
            timestamp: new Date().getTime(),
        };
        this.storage?.setItem(key, JSON.stringify(dataWithTimestamp));
    }

    getItem<T>(key: string): T | null {
        const item = this.storage?.getItem(key);
        if (item) {
            const dataWithTimestamp = JSON.parse(item);
            const { value, timestamp } = dataWithTimestamp;
            const currentTime = new Date().getTime();
            const fiveMinutesInMillis = 5 * 60 * 1000;

            if (currentTime - timestamp > fiveMinutesInMillis) {
                this.removeItem(key);
                return null;
            }

            return value;
        }
        return null;
    }

    removeItem(key: string): void {
        this.storage?.removeItem(key);
    }

    clear(): void {
        this.storage?.clear();
    }

    serializeMap<K, V>(map: Map<K, V>): string {
        return JSON.stringify(Array.from(map.entries()));
    }

    deserializeMap<K, V>(serializedMap: string): Map<K, V> {
        //console.log(serializedMap);
        const entries = JSON.parse(serializedMap) as [K, V][];
        return new Map(entries);
    }

    clearOldItems(maxAgeMillis: number): void {
        if (this.storage !== null) {
            //console.log("Storage exists");
            const currentTime = new Date().getTime();
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage?.key(i);
                if (key && (key == "mp_volumes" || key == "authors")) {
                    const item = this.storage?.getItem(key);
                    if (item) {
                        const dataWithTimestamp = JSON.parse(item);
                        const { timestamp } = dataWithTimestamp;
                        if (currentTime - timestamp > maxAgeMillis) {
                            this.removeItem(key);
                        }
                    }
                }
            }
        }
    }
}
