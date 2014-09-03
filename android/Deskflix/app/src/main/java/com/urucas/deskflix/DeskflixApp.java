package com.urucas.deskflix;

import android.app.Application;

/**
 * Created by Urucas on 9/3/14.
 */
public class DeskflixApp extends Application {

    private static DeskflixApp _instance;

    public DeskflixApp() {
        super();
        _instance = this;
    }

    public static DeskflixApp getInstance() {
        return _instance;
    }
}
