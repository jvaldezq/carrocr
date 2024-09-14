import {Field, Form, FormRenderProps, SupportedInputs} from 'react-final-form';
import {useCallback} from 'react';
import {Dropdown} from "@/components/Forms/Dropdown/Dropdown";
import {useGetMakes} from "@/sections/CarEntry/service";

interface PersonalInfoForm {
    test: string;
}

export interface PersonalInfoProps extends FormRenderProps<PersonalInfoForm> {
}

const PersonalInfo = (props: PersonalInfoProps) => {
    const {handleSubmit} = props;
    const {data, isLoading} = useGetMakes();

    return <form id="car-entry" onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
        <Field
            name="makeId"
            component={Dropdown as unknown as SupportedInputs}
            placeholder='Marca'
            label='Marca'
            loading={isLoading}
            autoFocus={true}
            options={data}
        />
    </form>
}

export const CreateCarWrapper = () => {
    const onSubmit = useCallback(
        (data: PersonalInfoForm) => {
            console.log('HELLO MOTO', data)
        },
        [],
    );

    return (
        <Form
            initialValues={{
                test: 'test'
            }}
            onSubmit={onSubmit}
            // validate={validate}
            // validateOnBlur={true}
        >
            {(formProps) => <PersonalInfo {...formProps} />}
        </Form>
    );
};
