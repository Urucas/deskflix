package com.urucas.deskflix.activities;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

import com.urucas.deskflix.R;
import com.urucas.deskflix.interfaces.RemoteControlCallback;
import com.urucas.deskflix.sockets.RemoteControl;

import java.util.ArrayList;


public class MainActivity extends ActionBarActivity {

    private RemoteControl remote;
    private Spinner socketsSpinner;
    private Button fullscreenToggle;
    private Button playToggle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        socketsSpinner = (Spinner) findViewById(R.id.socketsSpinner);
        socketsSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selectSocket((String) parent.getItemAtPosition(position));
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        remote = new RemoteControl(MainActivity.this, new RemoteControlCallback() {
            @Override
            public void onSocketFound(ArrayList<String> socketsName) {
                refreshSpinner(socketsName);
            }
            @Override
            public void onSocketDisconected(ArrayList<String> socketsName) {

            }
        });
        refreshSpinner(new ArrayList<String>());

        remote.search4Sockets();

        fullscreenToggle = (Button) findViewById(R.id.fullscreenToggle);
        fullscreenToggle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                remote.fullscreen();
            }
        });

        playToggle = (Button) findViewById(R.id.playToggle);
        playToggle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                remote.toggle();
            }
        });

    }

    private void selectSocket(String localname) {
        remote.selectSocket(localname);
    }

    public void refreshSpinner(ArrayList<String> socketsList) {

        if(socketsList.size() == 0){
            socketsList.add(getResources().getString(R.string.nosockets));
        }

        ArrayAdapter<String> spinnerArrayAdapter = new ArrayAdapter<String>(
                MainActivity.this,
                R.layout.spinner_item,
                socketsList
        );

        spinnerArrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        socketsSpinner.setAdapter(spinnerArrayAdapter);
    }

}
