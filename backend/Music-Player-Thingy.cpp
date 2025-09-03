#include <bits/stdc++.h>
using namespace std;

class playlist{
    public:
    class song{
        public:
        string Name;
        string Artist;
        song* next;
        song* prev;
        song* shufNext;
        song* shufPrev;
        song(
            string nm = "placeholder name",
            string artst = "placeholder artist",
            song* nxt = nullptr,
            song* prv = nullptr,
            song* shufNxt = nullptr,
            song* shufPrv = nullptr
        ){
            Name = nm;
            Artist = artst;
            next = nxt;
            prev = prv;
            shufNext = shufNxt;
            shufPrev = shufPrv;
        }
    };
    int size = 0;
    string playlistName;
    song* start;
    song* lastAdded;
    int shuffled = 0;
    int looped = 0;
    playlist(
        string name = "demi",
        song* nxt = nullptr,
        song* end = nullptr
    ){
        playlistName = name;
        start = nxt;
        lastAdded = end;
    }

    void showPlaylist(){
        song* curr = start;
        int i = 1;
        cout << playlistName << endl endl;
        while(curr){
            cout << "   " << i << ". " << curr->Name << endl;
            cout << "      " << curr->Artist << endl << endl;
            curr = curr->next;
        }
    }

    void addToPlaylist(string name, string artist){
        song* newSong = new song(name, artist);
        song* newAllSong = new song(name, artist);
        if(!start){
            start = newSong;
            lastAdded = start;
            size++;
        }
        if(!allSongs.start){
            allSongs.start = newAllSong;
            allSongs.lastAdded = allSongs.start;
            allSongs.size++;
        }
        else{
            lastAdded->next = newSong;
            newSong->prev = lastAdded;
            lastAdded = newSong;
            size++;

            allSongs.lastAdded->next = newAllSong;
            newAllSong->prev = allSongs.lastAdded;
            allSongs.lastAdded = newAllSong;
            allSongs.size++;
        }
    }

    void removeFromPlaylist(string name, string artist){
        if(!start){
            cout << "No songs to delete." << endl;
        }
        song* curr = start;

        if(curr->Name == name && curr->Artist = artist){
            start = curr->next;
            if (start) start->prev = nullptr;
            delete curr;
            size--;
        }
        else{
            while(curr->next && (curr->next->Name != name || curr->next->Artist != artist)){
                curr = curr->next;
            }
            song* deleteSong = curr->next;
            curr->next = curr->next->next;
            curr->next->prev = curr;
            delete deleteSong;
            size--;
        }
    }

    void shufflePlaylist(){
        vector<song*> songs;
        song* curr = start;
        while (curr) {
            songs.push_back(curr);
            curr = curr->next;
        }

        random_device rd;
        mt19937 g(rd());
        shuffle(songs.begin(), songs.end(), g);
        for (int i = 0; i < songs.size(); i++) {
            songs[i]->shufNext = (i + 1 < songs.size()) ? songs[i + 1] : nullptr;
            songs[i]->shufPrev = (i > 0) ? songs[i - 1] : nullptr;
        }
    }

    void play(){
        song* currentlyPlaying = start;
        if(!start){
            cout << "No songs in the playlist yet." << endl;
            cout << "Playlist ended." << endl;
        }
        else{
            int exit = 0;
            int next = 0;
            int prev = 0;
            while(!exit){
                clearScreen();
                int choice;
                if(next){
                    if(shuffled){
                        currentlyPlaying = currentlyPlaying->shufNext;
                    }
                    else{
                        currentlyPlaying = currentlyPlaying->next;
                    }
                    next--;
                }
                if(prev){
                    if(shuffled){
                        currentlyPlaying = currentlyPlaying->shufPrev;
                    }
                    else{
                        currentlyPlaying = currentlyPlaying->prev;
                    }
                    prev--;
                }
                if(exit){
                    exit--;
                    cout << endl << "Playlist ended." << endl;
                    continue;
                }
                cout << "Now Playing: " << currentlyPlaying->Name << endl;
                cout << "By: " << currentlyPlaying->Artist << endl;
                cout << endl << "Shuffle: ";
                if(shuffled){
                    cout << "enabled" << endl;
                }
                else{
                    cout << "disabled" << endl;
                }
                cout << "Options:" << endl;
                cout << "   1. Next Song." << endl;
                cout << "   2. Prev Song." << endl;
                cout << "   3. Enable/disable shuffle." << endl;
                cout << "   4. Enable/disable loop." << endl;
                cout << "   5. Exit." << endl << endl;
                cout << "Choose: ";
                cin >> choice;
                switch(choice){
                    case 1:
                    next++;
                    break;

                    case 2:
                    prev++;
                    break;

                    case 3:
                    if(shuffled){
                        shuffled--;
                    }
                    else{
                        shuffled++;
                    }
                    break;

                    case 4:
                    if(looped){
                        looped--;
                    }
                    else{
                        looped++;
                    }
                    break;

                    case 5:
                    exit++;
                    break;
                        
                    default:
                    break;      
                }
            }
        }
    }
};

vector<playlist*> playlists;
playlist allSongs;

void clearScreen() {
    #ifdef _WIN32
        system("CLS");   // Windows
    #else
        system("clear"); // Linux / macOS / Unix
    #endif
}

int main(){
    int exit = 0;
    while(!exit){
        int choice;
        clearScreen();
        cout << "Options:" << endl;
        cout << "   1. Player." << endl;
        cout << "   2. Show Playlist." << endl;
        cout << "   3. Manage Playlist." << endl;
        cout << "   4. Make Playlist." << endl;
        cout << "   5. All Songs." << endl;
        cout << "   6. Exit." << endl << endl;
        cout << "Choose: "; cin >> choice;
        switch(choice){
            case 1:
            int j = 0;
            cout << "Stored Playlists: " << endl;
            for(int i = 0; i < playlists.size(); i++){
                cout << i + 1 << ". Name: " << playlists[i]->playlistName << endl endl;
            }
            cout << "Choice: "; cin >> j;
            playlists[j - 1]->play();
            break;

            case 2:
            cout << "Stored Playlists: " << endl;
            for(int i = 0; i < playlists.size(); i++){
                cout << (i + 1) << ". Name: " << playlists[i]->playlistName << endl endl;
            }
            break;

            case 3: {
            if (playlists.empty()) {
                cout << "No playlists exist yet." << endl;
                cin.ignore();
                cin.get(); // wait for input
                break;
            }

            cout << "Select a playlist to manage:" << endl;
            for (int i = 0; i < playlists.size(); i++) {
                cout << i + 1 << ". " << playlists[i]->playlistName << endl;
            }

            int plChoice;
            cout << "Choice: ";
            cin >> plChoice;

            if (plChoice < 1 || plChoice > playlists.size()) {
                cout << "Invalid choice." << endl;
                cin.ignore();
                cin.get();
                break;
            }

            playlist* chosen = playlists[plChoice - 1];
            int manageExit = 0;

            while (!manageExit) {
                clearScreen();
                cout << "Managing Playlist: " << chosen->playlistName << endl;
                cout << "Options:" << endl;
                cout << "   1. Add Song" << endl;
                cout << "   2. Remove Song" << endl;
                cout << "   3. Show Playlist" << endl;
                cout << "   4. Back" << endl;
                cout << "Choose: ";
                int mChoice;
                cin >> mChoice;

                switch (mChoice) {
                    case 1: {
                        string songName, artistName;
                        cout << "Enter song name: ";
                        cin.ignore();
                        getline(cin, songName);
                        cout << "Enter artist name: ";
                        getline(cin, artistName);
                        chosen->addToPlaylist(songName, artistName);
                        cout << "Song added!" << endl;
                        cin.get();
                        break;
                    }

                    case 2: {
                        string songName, artistName;
                        cout << "Enter song name to remove: ";
                        cin.ignore();
                        getline(cin, songName);
                        cout << "Enter artist name: ";
                        getline(cin, artistName);
                        chosen->removeFromPlaylist(songName, artistName);
                        cout << "Song removed (if it existed)." << endl;
                        cin.get();
                        break;
                    }

                    case 3:
                        chosen->showPlaylist();
                        cin.ignore();
                        cin.get();
                        break;

                    case 4:
                        manageExit = 1;
                        break;

                    default:
                        cout << "Invalid option." << endl;
                        cin.ignore();
                        cin.get();
                        break;
                }
            }
            break;
        }

            break;

            case 4:
            string name;
            cout << "Enter playlist name: "; cin >> name;
            playlists.push_back(new playlist(name));
            break;

            case 5:
            allSongs.showPlaylist();
            break;

            case 6:
            exit++;
            break;

            default:
            break;
        }
    }
}