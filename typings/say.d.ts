declare module "say" {
    function stop(): void;

    function speak(text: string, voice: string, speed: number): void;
}