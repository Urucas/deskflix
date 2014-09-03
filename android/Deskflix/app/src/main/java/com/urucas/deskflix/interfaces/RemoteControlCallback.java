package com.urucas.deskflix.interfaces;

import java.util.ArrayList;

/**
 * Created by Urucas on 8/20/14.
 */
public interface RemoteControlCallback {

    public void onSocketFound(ArrayList<String> socketsName);

    public void onSocketDisconected(ArrayList<String> socketsName);

}
