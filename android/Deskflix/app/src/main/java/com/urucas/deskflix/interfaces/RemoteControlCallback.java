package com.urucas.deskflix.interfaces;

import java.util.ArrayList;

/**
 * Created by Urucas on 8/20/14.
 */
public interface RemoteControlCallback {

    public void onPopcornFound(ArrayList<String> socketsName);

    public void onPopCornDisconected(ArrayList<String> socketsName);

}
