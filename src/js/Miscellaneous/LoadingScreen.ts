export class LoadingScreen {

    private static setLoading() {
        if(LoadingScreen.isLoaded) {
            LoadingScreen.classList.remove('loaded');
            LoadingScreen.classList.add('loading');
        }
    }

    private static setLoaded() {
        if(!LoadingScreen.isLoaded) {
            LoadingScreen.classList.add('loaded');
            LoadingScreen.classList.remove('loading');
        }
    }

    public static Load(callback: () => void = () => {}) {
        LoadingScreen.setLoading();
        setTimeout(LoadingScreen.setLoaded, 2400);
        setTimeout(callback, 2400);
    }
    
    private static get classList() : DOMTokenList {
        return document.body.classList
    }
    
    public static get isLoaded() : boolean {
        return LoadingScreen.classList.contains('loaded');
    }
    
}