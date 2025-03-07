import Input from './Input';
import DateInput from './DateInput';
import CardinalDirections from './CardinalDirections';
import RadioButtons from './Radio';
import PropTypes from 'prop-types';
import { Button } from '@mui/material'
import '../styles/sidebar.css'
import '../styles/loading.css'

// Once the date is changed the tempRes and temporalAggregation get reset in formdata back to their useState initial values
const Sidebar = ({
    variable,
    setVariable,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formData,
    handleChange,
    queryData,
    isLoading, 
    queryResponse,}) => {

    return (
        <>
            <div className="sidebar_wrapper" style={{ width: "300px" }}>
                <div className="padding" />
                <Input
                    val={variable}
                    setVal={setVariable}
                    label={"Variable"}
                    options={["2 meter temperature",
                        "Surface Pressure",
                        "Sea Surface Temperature",
                        "Total Precipitation",
                        "Ice Temperature - Layer 1",
                        "Ice Temperature - Layer 2",
                        "Ice Temperature - Layer 3",
                        "Ice Temperature - Layer 4",
                        "Snow Depth",
                        "Snowfall",
                        "Snowmelt",
                        "Temperature of Snow Layer"
                    ]}
                    sx={{ width: "65%" }}
                    size={"small"}
                    varLabel={"variable"} />
                <DateInput
                    date={startDate}
                    setDate={setStartDate}
                    label="Start Date & Time" />
                <DateInput
                    date={endDate}
                    setDate={setEndDate}
                    label="End Date & Time" />
                {/* </div> */}
                <RadioButtons
                    label="Resolutions"
                    options={["H", "D", "M", "Y"]}
                    var={formData.temporalResolution}
                    setVal={handleChange}
                    // subLabel="temporalResolution"
                    defaultValue={"Y"} />
                <RadioButtons
                    // label="Spatial Resolution"
                    options={[0.25, 0.5, 1]}
                    var={formData.spatialResolution}
                    setVal={handleChange}
                    // subLabel="spatialResolution"
                    defaultValue={1} />
                <RadioButtons
                    label="Aggregation"
                    options={["min", "max", "mean"]}
                    // var={formData.spatialAggregation}
                    setVal={handleChange}
                    // subLabel="spatialAggregation"
                    defaultValue={"mean"} />
                <div className="hr" />
                <CardinalDirections formData={formData} handleChange={handleChange} />
                <div className="hr" />
                <Button
                    onClick={() => queryData()}
                    variant="outlined"
                    disabled={isLoading}
                    sx={{ marginTop: "auto" }}
                >
                    <div className="button-content">
                        {isLoading && <div className="loading-spinner" />}
                        Query
                    </div>
                </Button>
                <p className="query-msg">{queryResponse}</p>
            </div>
        </>
    )
}

Sidebar.propTypes = {
    variable: PropTypes.any,
    setVariable: PropTypes.func,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    setStartDate: PropTypes.func,
    setEndDate: PropTypes.func,
    formData: PropTypes.object,
    handleChange: PropTypes.func,
    queryData: PropTypes.func,
    isLoading: PropTypes.bool,
    queryResponse: PropTypes.string,
};

export default Sidebar;