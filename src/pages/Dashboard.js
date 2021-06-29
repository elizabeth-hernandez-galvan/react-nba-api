import instance from '../api/apiConfig';
import { useEffect, useState } from 'react';
import TeamCards from '../components/TeamCard';

const DashboardPage = () => {
    const [teams, setTeams] = useState ([])
    const getTeams= async() => {
        try{
            let{data} = await instance.get('/teams')
            let clubs = data.data;
            setTeams(clubs)
            }
        catch(e){
            console.log(e)
            }
    }

useEffect(() => {
    getTeams();
});

    return (
        <div id = 'home-page'>
            {/** Page Title */}
        <div className='row text-center mt-3'>
            <div className='col'>
                <h1>NBA TEAMS</h1>
            </div>
        </div>

        {/** Search Bar */}
        <div className='row'>
            <div className='col'>
                <div className='form-group'>
                    <input
                    type='text'
                    className='form-control'
                    id='team-search'
                    placeholder='search for team'
                    />
                </div>
            </div>
        </div>

        {/** Team Cards */}
        <div className='row'>
            <div className='row'>
                {teams.map((team,index) => {
                    return (
                        <div className='five-columns' key={index}>
                            <TeamCards team={team}/>
                        </div>
                        )
                })}
            </div>
        </div>
        </div>
    );
}

export default DashboardPage;